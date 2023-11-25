const express=require('express');
const bodyParser=require('body-parser')
const axios=require('axios');


const app=express();
const port =3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});
app.post('/send-otp', async (req, res) => {
    const userPhoneNumber = req.body.phonenumber;

    const apiUrl = 'http://sms.digicoders.in/api/sendhttp.php';
    const authKey = '370038AjEi8ZvFO6561b097P1';
    const senderId = 'DIGICO';
    const dltTemplateId = '1307164706435757762';

    // Using the provided DLT Template
    const otp = generateOTP();
    const message = `Your OTP Code is ${otp}. Do not share it with anyone. From AppNameHere. #TeamDigiCoders`;

    try {
        const response = await axios.get(apiUrl, {
            params: {
                authkey: authKey,
                mobiles: userPhoneNumber,
                message: message,
                sender: senderId,
                route: 4,
                country: 0,
                DLT_TE_ID: dltTemplateId
            }
        });

        console.log('OTP sent:', response.data);
        res.send('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).send('Error sending OTP');
    }
});

function generateOTP() {
    // Logic to generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
}



app.listen(port,()=>{
    console.log(`server is running on http://localhosst:${port}`);
})