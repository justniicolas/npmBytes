import type { APIRoute } from "astro";
import { app } from "../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const post: APIRoute = async ({ request, redirect }) => {
  console.log(import.meta.env.FIREBASE_PROJECT_ID);
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  if (!email) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  try {
    const db = getFirestore(app);
    const subscribeRef = db.collection("subscribe");
    const querySnapshot = await subscribeRef.where("email", "==", email).get();

    if (querySnapshot.empty) {
      return new Response("Email not found", {
        status: 404,
      });
    }

    const docId = querySnapshot.docs[0].id;
    await subscribeRef.doc(docId).delete();
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }

  return redirect("/");
};
