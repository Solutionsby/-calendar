import { db } from "../utilities/firebaseConfig";
import { Appointment } from "../../Types/types";
import {
	collection,
	getDocs,
	deleteDoc,
	updateDoc,
	doc,
	addDoc,
} from "firebase/firestore";

export const fetchAppointments = async (): Promise<Appointment[]> => {
	const querySnapshot = await getDocs(collection(db, "appointments"));
	console.log(querySnapshot);
	return querySnapshot.docs.map((doc) => ({
		...(doc.data() as Appointment),
	}));
};
export const addDataToFirestore = async (data: Appointment): Promise<void> => {
	try {
		const appointmentsCollection = collection(db, "appointments");
		await addDoc(appointmentsCollection, data);
		console.log("Nowe wydarzenie zostało dodane", data);
		// Możesz tu wywołać fetchAppointments, jeśli chcesz natychmiastowo zaktualizować stan w komponencie
	} catch (error) {
		console.error("Błąd podczas dodawania wydarzenia: ", error);
	}
};

// Funkcja do usuwania wydarzenia
export const deleteEventFromFirestore = async (id: string): Promise<void> => {
	try {
		const dataRef = doc(db, "appointments", id);
		await deleteDoc(dataRef);
		console.log(`Wydarzenie z id ${id} zostało usunięte.`);
		// Możesz tu wywołać fetchAppointments, jeśli chcesz natychmiastowo zaktualizować stan w komponencie
	} catch (error) {
		console.error("Błąd podczas usuwania wydarzenia: ", error);
	}
};

// Funkcja do aktualizacji wydarzenia
export const updateEventInFirestore = async (
	data: Appointment
): Promise<void> => {
	try {
		const dataRef = doc(db, "appointments", data.id);
		await updateDoc(dataRef, { ...data });
		console.log("Wydarzenie zostało zaktualizowane", data);
		// Możesz tu wywołać fetchAppointments, jeśli chcesz natychmiastowo zaktualizować stan w komponencie
	} catch (error) {
		console.error("Błąd podczas aktualizacji wydarzenia: ", error);
	}
};
