export const getExample = (req, res) => {
  res.status(200).json({ message: 'Hello from the example controller!' });
};