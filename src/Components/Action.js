// Action Creator

export function AddName(name) {
  return {
    type: 'AddName',
    data: name,
  };
}

export function AddData(form) {
  return {
    type: 'AddData',
    data: form,
  };
}
