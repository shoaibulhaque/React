function Employee(props) {
    return (
        <>
        <h3>Employee {props.name}</h3>
        <p>{props.role ? props.role : "No Role"}</p>
    </>
    )
}


// This is going to allow us to use this Employee's component 
// inside other files
export default Employee; 