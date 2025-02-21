import { FormPropType } from '@/types/tab-form'

const Interest = ({ data, setData, errors }: FormPropType) => {
  const { interests } = data

  const handleOnCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target
    console.log({ [name]: checked })
    setData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, name]
        : prev.interests.filter((int) => int !== name),
    }))
  }

  return (
    <div className='interest-main'>
      <h3>Interests</h3>
      <div>
        <div className='interests-list'>
          <input
            type='checkbox'
            id='coding'
            name='coding'
            checked={interests.indexOf('coding') !== -1}
            onChange={handleOnCheckboxChange}
          />
          <label htmlFor='coding'>Coding</label>
        </div>
        <div className='interests-list'>
          <input
            type='checkbox'
            id='music'
            name='music'
            checked={interests.indexOf('music') !== -1}
            onChange={handleOnCheckboxChange}
          />
          <label htmlFor='music'>Music</label>
        </div>
        <div className='interests-list'>
          <input
            type='checkbox'
            id='reading'
            name='reading'
            checked={interests.indexOf('reading') !== -1}
            onChange={handleOnCheckboxChange}
          />
          <label htmlFor='reading'>Reading</label>
        </div>
        <div className='interests-list'>
          <input
            type='checkbox'
            id='sleeping'
            name='sleeping'
            checked={interests.indexOf('sleeping') !== -1}
            onChange={handleOnCheckboxChange}
          />
          <label htmlFor='sleeping'>Sleeping</label>
        </div>
        {errors.interests && <span className='error'>{errors.interests}</span>}
      </div>
    </div>
  )
}

export default Interest
