import classes from './app.module.scss';
import logo from './Logo.svg';
import SearchBtn from '../search-btn';
import ChangeTransfer from '../change-transfers';
import TaskList from '../task-list';

export default function App() {
  return (
    <div className={classes.main}>
      <div className={classes['main-header']}>
        <img className={classes['main-logo']} src={logo} alt="Logo" />
      </div>
      <div className={classes['main-block']}>
        <div className={classes['main-search']}>
          <SearchBtn />
          <TaskList />
        </div>

        <ChangeTransfer />
      </div>
    </div>
  );
}
