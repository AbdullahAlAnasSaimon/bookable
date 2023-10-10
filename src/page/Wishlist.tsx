import { useAppSelector } from "@/redux/hooks";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/types/globalTypes";

const Wishlist = () => {
  const { products, wishlist } = useAppSelector((state) => state.product);
  // console.log(wishlist);
  // console.log(products);
  const matchingProducts = products.filter((product: { _id: string }) =>
    wishlist.some(
      (item: { productId: string }) => item.productId === product._id
    )
  );

  console.log(matchingProducts);

  return (
    <div>
      <h1>Wishlist</h1>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S/N</TableHead>
            <TableHead>Product Info</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchingProducts?.map((item: IProduct, index) => (
            <TableRow key={item?._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="flex gap-5">
                <div>
                  <img src={item?.photo} alt="" className="w-10 h-16" />
                </div>
                <div>
                  <p>{item?.title}</p>
                  <p>{item?.genre}</p>
                  <p>{item?.publication_date?.substring(0, 15).trim()}</p>
                </div>
              </TableCell>
              <TableCell>
                <p>{item?.author}</p>
              </TableCell>
              <TableCell className="text-right">{item.price}</TableCell>
              <TableCell>{}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Wishlist;
