var gpio = require('rpi-gpio');

exports.setup() = gpio.setup()

gpio.setup(7,'DIR_OUT',(err)=>{
    return err.toString();
})

exports.defaulton = gpio.write(7,true,(err)=>{
    return err.toString();
})
