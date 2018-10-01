import sys
import RPi.GPIO as gpio

gpio.setwarnings(False)
gpio.setmode(gpio.BOARD)
gpio.setup(11, gpio.OUT , initial=0)
if sys.argv[1]=='true':
    gpio.output(11,True)
    sys.stdout.write('done')
    print(sys.argv[1])
elif sys.argv[1]=='false':
    gpio.output(11,False)
    sys.stdout.write('done')
    print(sys.argv[1])
    