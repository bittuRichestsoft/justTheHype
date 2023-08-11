import RNLocation from 'react-native-location';
RNLocation.configure({
	distanceFilter: 0
})
//http://rrmr.co.in/tap_brewery/public/admin/login
// const BaseURL = 'http://167.172.209.57/tap_brewery/public/api/v1/user/'
// const BaseURL1 = 'http://167.172.209.57/tap_brewery/public/api/v1/'

// const BaseURL = 'http://rrmr.co.in/tap_brewery/public/api/v1/user/'
// const BaseURL1 = 'http://rrmr.co.in/tap_brewery/public/api/v1/'
// const BaseImageURL = 'http://rrmr.co.in/koralyo/public/uploads/advertisements/'

 //const BaseURL = 'http://167.172.209.57/tap_brewery/public/api/v1/user/'
//const BaseURL1 = 'http://167.172.209.57/tap_brewery/public/api/v1/'

//  const BaseURL = 'http://192.241.128.209/tap_brewery/public/api/v1/user/'
//  const BaseURL1 = 'http://192.241.128.209/tap_brewery/public/api/v1/'

  const BaseURL = 'https://www.jttadmin.com/tap_brewery/public/api/v1/user/'
  const BaseURL1 = 'https://www.jttadmin.com/tap_brewery/public/api/v1/'
const BaseImageURL = 'http://167.172.209.57/koralyo/public/uploads/advertisements/'


export { BaseURL, BaseURL1 };



export function getUserCurrentLocation() {

	return new Promise((resolve, reject) => {
		RNLocation.requestPermission({
			ios: "whenInUse",
			android: {
				detail: "fine"
			}
		}).then(granted => {
			console.log(granted)

			if (granted) {
				//   this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {

				// 	console.log("  user location>>>>>>>>>>>>"+this.locationSubscription)
				// 	console.log(locations)
				// 	resolve(locations);
				//   })
				RNLocation.getLatestLocation({ timeout: 60000 })
					.then(latestLocation => {

						resolve(latestLocation);
						// Use the location here
					})

			} else {

			}
		}


		)
	});
}