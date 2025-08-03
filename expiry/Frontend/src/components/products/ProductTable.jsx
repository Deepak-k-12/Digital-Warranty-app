// A placeholder that just lists the product names.
const ProductTable = ({ products }) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold">Product Table</h3>
      <ul>
        {products?.map(p => <li key={p.id}>{p.name}</li>)}
      </ul>
    </div>
  );
};

export default ProductTable;