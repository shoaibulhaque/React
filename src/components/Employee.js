import EditEmployee from "./EditEmployee";

function Employee(props) {
  return (
    <div className="min-w-[350px] max-w-[350px] m-2 py-8 px-8 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        className="object-cover h-[100px] w-[100px] block mx-auto rounded-full sm:mx-0 sm:shrink-0"
        src={props.img}
        alt="Woman's Face"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{props.name}</p>
          <p className="text-slate-500 font-medium">{props.role}</p>
        </div>

        {/* Old Approach 
         <EditEmployee
          id={props.id}
          name={props.name}
          role={props.role}
          updateEmployee={props.updateEmployee}
        /> */}

        {props.editEmployee}
      </div>
    </div>
  );
}

// This is going to allow us to use this Employee's component
// inside other files
export default Employee;
