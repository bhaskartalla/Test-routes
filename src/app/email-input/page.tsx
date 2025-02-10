'use client'

import React, { useState } from 'react'
import { Autocomplete, TextField, Chip, Avatar, Box } from '@mui/material'

// Define the type for a person
interface Person {
  name: string
  email: string
  avatar: string
}

// Sample data for auto-suggest
const people: Person[] = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://via.placeholder.com/32',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://via.placeholder.com/32',
  },
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://via.placeholder.com/32',
  },
  {
    name: 'Bob Brown',
    email: 'bob@example.com',
    avatar: 'https://via.placeholder.com/32',
  },
]

const EmailInput: React.FC = () => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([])

  const handleAddPerson = (
    _event: React.SyntheticEvent,
    newValue: Person[]
  ) => {
    // Add selected person if not already in the list
    const uniqueValue = newValue.filter(
      (person) =>
        !selectedPeople.some((selected) => selected.email === person.email)
    )

    setSelectedPeople([...selectedPeople, ...uniqueValue])
  }

  const handleDelete = (personToDelete: Person) => {
    setSelectedPeople(
      selectedPeople.filter((person) => person.email !== personToDelete.email)
    )
  }
  return (
    <Box
      id='email-input-component'
      sx={{ maxWidth: 500, mx: 'auto', mt: 4, backgroundColor: 'white' }}
    >
      <Autocomplete
        multiple
        options={people}
        getOptionLabel={(option: Person) => `${option.name}  (${option.email})`}
        onChange={handleAddPerson}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Add people'
            placeholder='Type to search...'
            variant='outlined'
          />
        )}
        renderTags={() => null}
      />
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {selectedPeople.map((person) => (
          <Chip
            key={person.email}
            label={`${person.name} (${person.email})`}
            avatar={
              <Avatar
                alt={person.name}
                src={person.avatar}
              />
            }
            onDelete={() => handleDelete(person)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default EmailInput
