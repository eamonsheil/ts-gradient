async function init(firstAsInt: number, lastAsInt: number, interval: number, firstColor: string) {

    // encapsulating the hexArray population in a Promise for testing puropses
    // Trying to find ideal interval to achieve a smmooth gradient
    // if interval is too small this loop will overload the browser without error-checking/correction
    const arrayPopulate = new Promise<void>((resolve, reject) => {
        let loopCount = 0;
        for (let i = firstAsInt; i < lastAsInt; i += interval) {

            if (loopCount > 10000) {
                reject(() => 'interval is too small, too many loops')
                return

            }

            loopCount++;
            let hexVal = ''

            // increment Red
            const redVal = parseInt(firstColor.substring(0, 2)) + i
            hexVal += redVal;
            console.log('redVal: ', redVal)
            console.log(i.toString(16))


            // increment Green
            const greenVal = parseInt(firstColor.substring(2, 4)) + i * 3
            hexVal += greenVal;



            // increment Blue
            const blueVal = parseInt(firstColor.substring(4, 6)) + i
            hexVal += blueVal

            hexArray.push(hexVal)
            // debugger
        }
        resolve();
    })

    await arrayPopulate

    console.log('firstAsInt: ', firstAsInt)
    console.log('lastAsInt: ', lastAsInt)
    console.log('difference: ', difference)
    console.log('interval: ', interval)

    hexArray.push(lastAsInt)
    console.log(hexArray.length)
}

init();