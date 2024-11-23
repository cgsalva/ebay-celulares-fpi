import { collection, getDocs } from 'firebase/firestore/lite';
import { auth, db } from "src/boot/firebase";

export async function isAdminGuard(to, from, next) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return next({ name: "login" });
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'admins'));
    const adminsArray = querySnapshot.docs.map(doc => doc.data());

    const admin = adminsArray.find(admin => admin.email === user.email);

    if (admin) {
      next();
    } else {
      next({ name: "unauthorized" });
    }
  } catch (error) {
    console.error("Error al verificar admin:", error);
    next({ name: "error" });
  }
}
