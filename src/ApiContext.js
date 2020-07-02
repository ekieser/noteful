import React from 'react'

const ApiContext = React.createContext({
  notes: [],
  folders: [],
  folderPopup: '',
  toggleFolder: () => {},
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

export default ApiContext;