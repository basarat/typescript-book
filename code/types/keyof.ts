namespace Test {
  const colors = {
    red: 'red',
    blue: 'blue'
  }
  type Colors = keyof typeof colors; 

  let color: Colors;
  color = 'red'; // okay
  color = 'blue'; // okay
  color = 'blue'; // Error
}