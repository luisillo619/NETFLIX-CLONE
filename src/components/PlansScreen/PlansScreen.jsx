import db from "@/helpers/firebase";
import styles from "./PlansScreen.module.scss";
import {
  addDoc,
  collection,
  onSnapshot,
  getDoc,
  query,
} from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";

//  El método "onSnapshot()" de Firebase permite mantener los datos sincronizados en tiempo real entre Firestore y la aplicación web

// Los Snapshots son sessiones de firebase, tal cual las sesiones de mongoose
// las docRef son las cambios que va a analizar los snapshots antes de que se haga el commit final

export default function PlansScreen({ products, user }) {
  const [subscription, setSubscription] = useState(null);
  useEffect(() => {
    const q = query(collection(db, "customers", user.uid, "subscriptions"));

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(async (subscription) => {
        // console.log(subscription.data());

        setSubscription({
          role: subscription.data().role,
          current_period_start:
            subscription.data().current_period_start.seconds,
          current_period_end: subscription.data().current_period_end.seconds,
        });
      });
    });
  }, [user.uid]);

  const handleCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      // la sesion de la transaccion
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occurred: ${error.message}`);
      }
      if (sessionId) {
        // si la sesion de la transaccion exite y no hay fallas entonces:
        // public key
        const stripe = await loadStripe(
          "pk_test_51MkX1KFYyjM4gsmIJUN0nmiL9sqzwLL9PpPosXnw2yWvSJ004x1IMCcgkYon7zovP12NxJExJgZrNigSkCL1iRfo00bxZN5Pgv"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className={styles.plansScreen}>
      <br />
      {subscription && (
        <p className="plansScreen__renewal">
          Renewal date:{" "}
          {new Date(subscription?.current_period_end * 1000).toLocaleDateString(
            "CS-cs"
          )}
        </p>
      )}
      {Object.entries(products)?.map(([productId, productData]) => {
        // logica para verificar la subscripcion del ususario
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            className={`${styles.plansScreen__plan} ${
              isCurrentPackage && styles[`plansScreen__plan--disabled`]
            }`}
            key={productId}
          >
            <div className={styles.planScreen__info}>
              <h5> {productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && handleCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
