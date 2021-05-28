import Axios from 'axios'
import React, { useEffect, useState } from 'react'

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)


    useEffect(() => {
        
        let variable = { userTo: props.userTo }

        Axios.post('/api/subscribe/subscribeNumber', variable)
        .then(response => {
            if (response.data.success) {
                console.log(response.data)
                setSubscribeNumber(response.data.subscribeNumber)
            } else {
                alert('구독자 수를 받아오지 못했습니다.')
            }
        })

        //localStorage.getItem(userId)
        let subscribedVariable = { userTo: props.userTo, userFrom: props.userFrom }

        Axios.post('/api/subscribe/subscribed', subscribedVariable)
        .then(response => {
            if (response.data.success) {
                console.log(response.data.subscribed)
                setSubscribed(response.data.subscribed)
            } else {
                alert('정보를 받아오지 못했습니다.')
            }
        })

    }, [])

    const onSubscribe = async () => {

        let subscribedVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }

        

        // 이미 구독 중이라면
        if (Subscribed) {
            const response = await Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
            console.log(response.data)
    
            if (response.data.success) {
                setSubscribeNumber(SubscribeNumber - 1)
                console.log(SubscribeNumber)
                setSubscribed(!Subscribed)
            } else {
                alert('구독 취소 하는데 실패 했습니다.')
            }

        // 아직 구독 중이 아니라면
        } else {
            const response = await Axios.post('/api/subscribe/subscribe', subscribedVariable)
            console.log(response.data)
    
            if (response.data.success) {
                setSubscribeNumber(SubscribeNumber + 1)
                setSubscribed(!Subscribed)
            } else {
                alert('구독 하는데 실패 했습니다.')
            }
        }
    }

    return (
        <div>
            <button
                style={{ 
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius: '4px',
                    color: 'white', padding: '10px 16px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
