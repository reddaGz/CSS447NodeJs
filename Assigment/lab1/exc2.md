## difference between settimeout and set immediate
### setTimeout runs in Timer phase, setImmediate runs in check phase
### Also (setTimeout,0) will be slow because it will check the timer at least once before executing.

## setTimeout 
### is simply like calling the function after delay has finished. Whenever a function is called it is not executed immediately, but queued so that it is executed after all the executing and currently queued eventhandlers finish first. setTimeout(,0) essentially means execute after all current functions in the present queue get executed. No guarantees can be made about how long it could take.

## setImmediate 
### is similar in this regard except that it doesn't use queue of functions. It checks queue of I/O eventhandlers. If all I/O events in the current snapshot are processed, it executes the callback. It queues them immediately after the last I/O handler somewhat like process.nextTick. So it is faster.

 ## Differance between set imedate and process.nexttick
 ### 1.setImmdaite() is processed in the Check    handlers phase, while process.nextTick() is processed at the starting of the event loop and between each phase of the event loop

 ### On any given context process.nextTick() has higher priority over setImmediate().
 ### Unlike process.nextTick(), recursive calls to setImmediate() won't block the event loop, because every recursive call is executed only on the next event loop iteration.

 ## Global object
  ### Buffer ,process ,console,global ,setImmediate ,clearImmediate,setInterval, clearInterval,setTimeout,clearTimeOut,queueMicrotask, textEncoder ,textDecoder ,URL, require ,exports,modules,__dirname
  