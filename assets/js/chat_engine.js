// front end chat engin i.e this will be communicating from the client side
class ChatEngine {
    constructor(chatBoxId,userEmail){
        this.chatBoxId = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
    //<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js"></script>
        this.socket = io.connect('http://localhost:5000'); // io is a global variable as soon as we included " and it is give to us by socket.io file"
 
        if(this.userEmail){
            this.connectionHandler(); // clling onnection handler
        }
    }
//creating a connection hndler and this will have the to and fore interaction between observer and subscriber
    connectionHandler(){
        let self = this // as this has been utilized @line no 18
        
        // it runs on emit and on here on means detecting an event
        this.socket.on('connect',function(){
            console.log(`connection established using sockets...!`);
        });

        // when this event is emited it will be recive on chat socket 
        self.socket.emit('join_room',{ // creating a event names as joint room
            // sending data i.e which user we need to chat
            user_email:self.userEmail,
            chatroom: 'codeial'
        }); 
    
        // here we are reciving the data from obserer socket i.e user_joined
        self.socket.on('user_joined',function(data){
            console.log('a user joined',data);
        })
    
    
    }
}