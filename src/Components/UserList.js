import react from "react";
import { useState, useEffect, useRef } from "react";

const user_list = [
    { name: "Murad" },
    { name: "Feramiz" },
    { name: "Rovshen" },
    { name: "Tural" },
]


const UserList = () => {

    const [userList, setUserList] = useState(user_list);
    const [userList2, setUserList2] = useState(userList)
    const [userInput, setUserInput] = useState(false)
    const [showError, setShowError] = useState(false)
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } 
        else {
            console.log("ok2")
        }

        setUserList2(userList)


    }, [userList]);



    const newUser = (e) => {
        setUserInput(e.target.value)

        const { value } = e.target

        if (value.length >= 3) {
            setShowError(false)

            setUserInput(value)
        }
        else {
            setShowError(true)
        }
    }

    const submitForm = (e) => {
        if (userInput.length >= 3) {
            setUserList([...userList, { name: userInput }])
            setUserInput('')
            setUserList2([...userList, { name: userInput }])
        }

        e.preventDefault()
    }


    const deleteUser = (index, row) => {

        if (window.confirm(`${row.name}-i silmek istediyinizden eminsiniz?`)) {
            setUserList(old_value => [...old_value], userList.splice(index, 1))
        }
    }


    const searchUser = (e) => {
        if (e.target.value.length > 0) {
            const filtered_array = userList.filter(row => {

                // console.log(row.name)

                // console.log(e.target.value.match(row.name))
                return row.name.toString().toLowerCase().match(e.target.value.toString().toLowerCase().trim())
            })
            setUserList2([...filtered_array])
        }
        else {
            setUserList2(userList)
        }

    }

    return (
        <>
            <h2>User List</h2>
            <form onSubmit={submitForm}>
                <input type="text" onChange={newUser} value={userInput || ''} />
                <button type="submit">Add</button>
            </form>
            <br />
            {
                showError && <p>Adinizi daxil edin</p>
            }

            <input type="text" onChange={searchUser} />

            <ul>
                {
                    userList2.map((row, index) => {
                        return (
                            <li key={index} > {row.name} <button type="button" onClick={deleteUser.bind(this, index, row)}> X </button>  </li>
                        )
                    })

                }
            </ul>
        </>
    )
}

export default UserList;