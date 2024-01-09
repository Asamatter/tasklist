import React from 'react'

interface FormProps {
    handleSubmit: (e: React.FormEvent) => void;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
  }
  

  const Form: React.FC<FormProps> = ({ handleSubmit, title, setTitle }) => {

  return (
    <div className='flex flex-col'>
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="What needs to be done today?"
        className="bg-transparent break-words text-lg px-4 h-64 w-full outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
  
      <button className="bg-emerald-300 font-semibold text-gray-700 absolute -bottom-12 left-2 hover:bg-opacity-75 rounded-full px-4 py-2 mt-2 lg:mx-2"
        type="submit">Submit</button>


        

    </form>
  </div>
  
  )
}

export default Form