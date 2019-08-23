const { exec } = require('child_process') // importing child_process.exec only (saving memory)
const mail = require('nodemailer') // importing nodemailer
const file = require('file/smtpconfig.json')

function lol () {
  exec('/opt/vc/bin/vcgencmd measure_temp| sed "s/[^0-9.]//g"', (err, stdout) => { // getting raspberry pi's temputure
    if (err) {
      console.log(err) // error handle
    }
    let transporter = mail.createTransport({
      service: 'gmail',
      auth: {
        user: file.user, // your gmail,
        pass: file.pass // your google password
      }
    })
    let mailOpt = {
      from: file.user,
      to: file.receiver,
      subject: file.subject,
      text: `RaspberryPI Temputure: ${stdout}°C` // sending temp
    }
    transporter.sendMail(mailOpt, function (err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log('email sucessfully sent:', info)
      }
    })
  })
}
setInterval(lol, 3600000) // sending mail each 1hour (1hour = 3600000ms)
