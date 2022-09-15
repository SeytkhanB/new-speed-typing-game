
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import InfoIcon from '../assets/info-icon.png'
      
export default () => (
  <Popup trigger={
    <img 
        src={InfoIcon} 
        alt="Info icon"
        className='icon'
      />
  }>
    <div className='info-container'>
      <ol>
        <li>Click start button</li>
        <li>Type as fast as you can</li>
        <li>See results</li>
        <li>In history you can find all results</li>
      </ol>
    </div>
  </Popup>
);