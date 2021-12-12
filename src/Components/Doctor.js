import { useState, useRef, useEffect } from "react";
import "../assets/css/Doctor.css"

let doctors = ["Select a Doctor", "Doctor 1", "Doctor 2", "Doctor 3", "Doctor 4"];
let rooms = ["Select a Room", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


const Doctor = () => {
    const [firstDoctor, setFirstDoctor] = useState([])
    const [secondDoctor, setSecondDoctor] = useState([])
    const [thirdDoctor, setThirdDoctor] = useState([])
    const [fourthDoctor, setFourthDoctor] = useState([])
    const [pasientValue, setPasientValue] = useState('')
    const [room, setRoom] = useState(0)
    const [showError, setShowError] = useState(false)
    const refInput = useRef(null)


    useEffect(() => {
        const firstDoctor = localStorage.getItem("firstDoctor")
        setFirstDoctor(JSON.parse(firstDoctor))

        const secondDoctor = localStorage.getItem("secondDoctor")
        setSecondDoctor(JSON.parse(secondDoctor))

        const thirdDoctor = localStorage.getItem("thirdDoctor")
        setThirdDoctor(JSON.parse(thirdDoctor))

        const fourthDoctor = localStorage.getItem("fourthDoctor")
        setFourthDoctor(JSON.parse(fourthDoctor))
    }, [])

    useEffect(() => {
        localStorage.setItem('firstDoctor', JSON.stringify(firstDoctor))
        localStorage.setItem("secondDoctor", JSON.stringify(secondDoctor))
        localStorage.setItem("thirdDoctor", JSON.stringify(thirdDoctor))
        localStorage.setItem("fourthDoctor", JSON.stringify(fourthDoctor))
    })

    const newPasient = (e) => {

        if (e.target.value > 0) {
            setPasientValue([e.target.value])
            setShowError(true)
        }
        else {
            setShowError(false)
            setPasientValue('')
        }
    }

    const addPasient = (e) => {
        if (pasientValue.length > 0) {
            if (room === 1) {
                setFirstDoctor([{ name: pasientValue }])
            }
            else if (room === 2) {
                setSecondDoctor([{ name: pasientValue }])
            }
            else if (room === 3) {
                setThirdDoctor([{ name: pasientValue }])
            }
            else if (room === 4) {
                setFourthDoctor([{ name: pasientValue }])
            }
            else {
                alert("Please Choose a Doctor")
            }
        }
        else {
            setShowError(false)
            refInput.current.focus()
        }
        setPasientValue('')

        e.preventDefault()
    }



    const selectRooms = (e) => {

        var option_value = parseInt(e.target.value)
            setRoom(option_value)   
    }

    console.log(room)
    
    function deleteUser(arr, index, item) {
        if (window.confirm(`Are you sure delete Room ${arr.name}?`)) {
            if (item === firstDoctor) {
                setFirstDoctor(old_value => [...old_value], firstDoctor.splice(item, 1))
            }
            else if (item === secondDoctor) {
                setSecondDoctor(old_value => [...old_value], secondDoctor.splice(item, 1))
            }
            else if (item === thirdDoctor) {
                setThirdDoctor(old_value => [...old_value], thirdDoctor.splice(item, 1))
            }
            else if (item === fourthDoctor) {
                setFourthDoctor(old_value => [...old_value], fourthDoctor.splice(item, 1))
            }
        }
    }


    return (
        <>
            <form type="submit" onSubmit={addPasient} className="form">
                <div className="input_container">
                    <select onChange={newPasient} ref={refInput}>
                        {
                            rooms.map((item, index) => <option key={index} value={index}>{item}</option>)
                        }
                    </select>
                    {
                        !showError && <p>Please choose a room</p>
                    }
                </div>
                <select onChange={selectRooms}>
                    {
                        doctors.map((item, index) => {
                            return <option key={index} value={index}> {item} </option>
                        })
                    }
                </select>
                <button type="submit" className="submit_button">Add</button>
            </form>

            <div className="container">
                <ul className="user_list first">
                    <h1>Doctor 1</h1>
                    {
                        firstDoctor.map((item, index, arr) => {
                            return <li key={index}>
                                <span> {item.name} </span>  <button type="button" className="delete_button" onClick={deleteUser.bind(this, item, index, arr)}>Delete</button>
                            </li>
                        })
                    }
                </ul>

                <ul className="user_list second">
                    <h1>Doctor 2</h1>
                    {
                        secondDoctor.map((item, index, arr) => {
                            return <li key={index} style={{ fontSize: "30px" }}>
                                <span> {item.name} </span>  <button type="button" className="delete_button" onClick={deleteUser.bind(this, item, index, arr)}>Delete</button>
                            </li>
                        })
                    }
                </ul>

                <ul className="user_list third">
                    <h1>Doctor 3</h1>
                    {
                        thirdDoctor.map((item, index, arr) => {
                            return <li key={index}>
                                <span> {item.name} </span>  <button type="button" className="delete_button" onClick={deleteUser.bind(this, item, index, arr)}>Delete</button>
                            </li>
                        })
                    }
                </ul>

                <ul className="user_list fourth">
                    <h1>Doctor 4</h1>
                    {
                        fourthDoctor.map((item, index, arr) => {
                            return <li key={index}>
                                <span> {item.name} </span>  <button type="button" className="delete_button" onClick={deleteUser.bind(this, item, index, arr)}>Delete</button>
                            </li>
                        })
                    }
                </ul>

            </div>

        </>
    )
}


export default Doctor;