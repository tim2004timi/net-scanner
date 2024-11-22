import Navigation from './Navigation';
import UserProfile from './UserProfile';

function Header() {
  return (
    <div className='flex justify-between'>
      <Navigation />
      <UserProfile />
    </div>
  );
}

export default Header;
