import { FormDataType, FormPropType } from '@/types/tab-form'

const Profile = ({ data, setData, errors }: FormPropType) => {
  const { name, age, email } = data

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  return (
    <div className='profile-main'>
      <div>
        <label htmlFor='name'>Name : </label>
        <input
          id='name'
          type='text'
          name='name'
          value={name}
          onChange={handleInputChange}
        />
        {errors.name && <span className='error'>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor='age'>Age : </label>
        <input
          id='age'
          type='number'
          name='age'
          value={age}
          onChange={handleInputChange}
        />
        {errors.age && <span className='error'>{errors.age}</span>}
      </div>

      <div>
        <label htmlFor='email'>Email : </label>
        <input
          id='email'
          type='text'
          name='email'
          value={email}
          onChange={handleInputChange}
        />
        {errors.email && <span className='error'>{errors.email}</span>}
      </div>
    </div>
  )
}

export default Profile
