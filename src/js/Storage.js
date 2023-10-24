import Steps from '@/js/Steps';
import UserData from './UserData';


export default class Storage {
	
	

	saved() {
		localStorage.setItem(Steps[0], UserData.currentStep);
		localStorage.setItem("example", "example");

		return this;
	}
    
}
