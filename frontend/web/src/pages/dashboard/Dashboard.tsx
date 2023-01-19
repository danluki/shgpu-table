import { Navigate } from "react-router-dom";
import { useAdminStore } from "../../stores/adminStore";
import AddAdvertising from "./components/AddAdvertising";
import Advertisings from "./components/Advertisings";

const faculties = [
  {
    label: "Гуманитарный институт",
    value: "12",
  },
  {
    label: "Институт психологии и педагогики",
    value: "8",
  },
  {
    label: "Институт информационных технологий,точных и естественных наук",
    value: "11",
  },
  {
    label: "Факультет физической культуры",
    value: "3",
  },
  {
    label: "Университетский колледж",
    value: "15",
  },
];

const Dashboard = () => {
  const isAuth = useAdminStore((state) => state.isAuth);
  if (!isAuth) {
    return <Navigate to="/dashboard/login" />;
  }

  // const advertisingsStore = useAdvertisingsStore();

  return (
    <div>
      <AddAdvertising faculties={faculties} />
      <Advertisings />
    </div>
  );
};

export default Dashboard;
