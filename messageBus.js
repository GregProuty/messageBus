//Message Bus
function createMessageBus() {
	this.storage = [],
	this.subscribe = function(str, callback) {
		this.storage.push({str: callback})
	},
	this.publish = function(str, obj) {
		//publish will go through storage and find a subscription then execute its callback
		this.storage.forEach( (el) => {
			if(el[str]){
				el[str]()
			}
		})
	}
}

var messageBus = new createMessageBus;

//component A
messageBus.subscribe('new_signup', function(payload) {
	//do something with the payload
	console.log('YEAAAAAAH!')
});

//component B
messageBus.publish('new_signup', {'foo': 'bar', 'goo': 'gar'} );

//myCallback is invoked receiving {'foo': 'bar', 'goo': 'gar'} as the payload
//if components C. D. E. and F had similarly subscribed to this message they would all have
	//their callbacks invoked as well

// //Subscriber
// messageBus.subscribe({
//     channel: 'commerce',
//     topic: 'order_complete',
//     callback: function(payload) {
//         // do something with the payload
//     }
// });

// //Publisher example
// messageBus.publish({
//     channel: 'commerce',
//     topic: 'order_complete',
//     data: {
//       plan_level: 'GOLD',
//       user_id: '4273984723428'
//     }
// });

// console.log(messageBus)