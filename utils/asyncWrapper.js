export default function asyncWrapper(middleware) {
  return (req, res, next) => {
    middleware(req, res, next).catch(next);
  };
}
