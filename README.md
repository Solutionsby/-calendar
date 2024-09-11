Scheduler App

Opis projektu

Aplikacja Scheduler to aplikacja kalendarza oparta na React, która umożliwia zarządzanie wydarzeniami. Użytkownik może dodawać, edytować, usuwać wydarzenia oraz wyświetlać je w różnych widokach (dziennym, tygodniowym, miesięcznym). Aplikacja integruje się z Firebase Firestore, co pozwala na przechowywanie danych o wydarzeniach na serwerze.

Funkcje:
Dodawanie wydarzeń: Możliwość tworzenia nowych wydarzeń z opcjami ustawienia tytułu, daty rozpoczęcia, zakończenia i dodatkowych informacji.
Edytowanie wydarzeń: Użytkownik może edytować istniejące wydarzenia.
Usuwanie wydarzeń: Możliwość usunięcia wydarzeń z kalendarza.
Obsługa widoków: Wydarzenia mogą być wyświetlane w widoku dziennym, tygodniowym i miesięcznym.
Polska lokalizacja: Aplikacja jest w pełni zlokalizowana na język polski.
Firebase Firestore: Przechowywanie i synchronizacja danych w czasie rzeczywistym za pomocą Firebase.
Technologie

React (Vite) - Framework frontendowy.
TypeScript - Wykorzystanie TypeScript dla lepszej typizacji kodu.
DevExtreme React Scheduler - Komponenty kalendarza dla React.
Firebase Firestore - Baza danych NoSQL w chmurze.

Wymagania

Node.js - Wersja 14.x lub wyższa
npm lub yarn - Menedżer pakietów
Firebase - Konto Firebase z skonfigurowaną bazą danych Firestore i opcjonalnie Authentication.
Instalacja

Sklonuj repozytorium:
bash
Skopiuj kod
git clone https://github.com/your-repo/scheduler-app.git
Przejdź do katalogu projektu:
bash
Skopiuj kod
cd scheduler-app
Zainstaluj zależności:
bash
Skopiuj kod
npm install
Skonfiguruj Firebase:
Utwórz projekt w Firebase Console.
Skonfiguruj Firestore oraz opcjonalnie Firebase Authentication.
Wygeneruj plik konfiguracyjny dla Firebase i umieść go w pliku .env:
bash
Skopiuj kod
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
Uruchom aplikację:
bash
Skopiuj kod
npm run dev
Aplikacja powinna być dostępna pod adresem http://localhost:3000.
Użycie

Dodawanie wydarzeń: Kliknij w przycisk „Dodaj wydarzenie” lub kliknij w wybrane miejsce w kalendarzu, aby dodać nowe wydarzenie.
Edycja wydarzeń: Kliknij na istniejące wydarzenie, aby edytować jego szczegóły.
Usuwanie wydarzeń: W formularzu edycji wydarzenia wybierz opcję „Usuń wydarzenie”.
Zmiana widoku: Użyj przycisków przełączania widoków, aby zmieniać widok dzienny, tygodniowy i miesięczny.
Firebase Reguły

Przykłady API Firebase

Dodawanie wydarzeń:
typescript
Skopiuj kod
const addDataToFirestore = async (eventData) => {
await addDoc(collection(firestore, 'events'), eventData);
};
Aktualizowanie wydarzeń:
typescript
Skopiuj kod
const updateEventInFirestore = async (id, updatedData) => {
await updateDoc(doc(firestore, 'events', id), updatedData);
};
Usuwanie wydarzeń:
typescript
Skopiuj kod
const deleteEventFromFirestore = async (id) => {
await deleteDoc(doc(firestore, 'events', id));
};
Struktura projektu

bash
Skopiuj kod
scheduler-app/
├── public/ # Pliki publiczne
├── src/
│ ├── components/ # Komponenty aplikacji
│ ├── firebase/ # Konfiguracja Firebase
│ ├── views/ # Widoki (DayView, WeekView, etc.)
│ ├── App.tsx # Główna logika aplikacji
│ └── index.tsx # Punkt wejścia aplikacji
├── .env # Plik konfiguracyjny Firebase
├── package.json # Lista zależności
└── README.md # Dokumentacja
