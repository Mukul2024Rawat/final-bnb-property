import { redirect } from 'next/navigation';

const Dashboard: React.FC = () => {
  redirect("/user/dashboard/profile");
  return null;
};

export default Dashboard;
