import { useState } from "react"

const useCountdown = (date) =>{

    const [day, setDay] = useState('00')
    const [hour, setHour] = useState('00')
    const [minute, setMinute] = useState('00')
    const [second, setSecond] = useState('00')

    const countdown = () => {
        const countDate = new Date(date).getTime()
        const now = new Date().getTime() 

        const range = countDate - now

        const second = 1000
        const minute = second * 60
        const hour = minute * 60
        const day = hour * 24

        const dayNumber = Math.floor(range / day)
        const hourNumber = Math.floor((range % day) / hour)
        const minuteNumber = Math.floor((range % hour) / minute)
        const secondNumber = Math.floor((range % minute) / second)

        setDay(dayNumber)
        setHour(hourNumber)
        setMinute(minuteNumber)
        setSecond(secondNumber)
    }

    setInterval(countdown, 1000)


    return [day, hour, minute, second]

}

export default useCountdown