const undoable = (reducer, unoname = 'UNDO', redoname = 'REDO') => {
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  }

  return (state = initialState, action) => {
    const { past, present, future } = state

    switch (action.type) {
      case unoname:
        const prev = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        return {
          past: newPast,
          present: prev,
          future: [present, ...future],
        }
      case redoname:
        const next = future[0]
        const newFuture = future.slice(1)
        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        }
      default:
        const newPresent = reducer(present, action)
        if (present === newPresent) {
          return state
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: [],
        }
    }
  }
}

export default undoable
