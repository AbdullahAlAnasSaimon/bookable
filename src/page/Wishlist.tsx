import { useAppSelector } from "@/redux/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/types/globalTypes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useAddCurrentlyReadingMutation,
  useDeleteWishlistMutation,
} from "@/redux/features/api/apiSlice";
import { toast } from "@/components/ui/use-toast";

const Wishlist = () => {
  const {
    product: { products, wishlist },
    user: { user },
  } = useAppSelector((state) => state);
  const [deleteWishlist, { error }] = useDeleteWishlistMutation();
  const [addCurrentlyReading] = useAddCurrentlyReadingMutation();
  const matchingProducts: any = products.filter((product: { _id: string }) =>
    wishlist?.some(
      (item: { productId: string }) => item.productId === product._id
    )
  );

  const handleDeleteWishlistItem = async (id: string | undefined) => {
    const result = await deleteWishlist(id);
    if ("data" in result) {
      if (result.data.deletedCount > 0) {
        toast({
          title: "Success",
          description: "Book deleted Successfully",
        });
      } else {
        toast({
          title: "Error",
          description: `${error}`,
        });
      }
    }
  };

  const handlePlanToRead = async (id: string | undefined) => {
    const data = {
      email: user?.email,
      productId: id,
    };
    const result = await addCurrentlyReading(data);
    if ("data" in result) {
      if (result?.data?.acknowledged) {
        toast({
          title: "Success",
          description: "Book is now in Currently reading list",
        });
      } else {
        toast({
          title: "Error",
          description: `${error}`,
        });
      }
    }
  };

  return (
    <div className="w-10/12 mx-auto">
      {matchingProducts ? (
        <p>Currently No Book available in wishlist!</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S/N</TableHead>
              <TableHead>Product Info</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matchingProducts?.map((item: IProduct, index: string) => (
              <TableRow key={item?._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="flex gap-5">
                  <div>
                    <img src={item?.photo} alt="" className="w-10 h-16" />
                  </div>
                  <div>
                    <p>{item?.title}</p>
                    <p className="text-sm italic">{item?.genre}</p>
                    <p className="font-semibold text-sm">$ {item?.price}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p>{item?.author}</p>
                </TableCell>
                <TableCell>
                  <div>
                    <button
                      onClick={() => handlePlanToRead(item?._id)}
                      className="text-[12px] px-3 py-1 rounded-full mr-2 bg-slate-900 text-white hover:bg-slate-700"
                    >
                      Plan to Read
                    </button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-[12px] px-3 py-1 rounded-full mr-2 bg-red-500 text-white hover:bg-red-600">
                          Remove
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Remove - {item?.title}</DialogTitle>
                          <DialogDescription>
                            Are you sure? you want to remvoe "{item?.title}"
                            book from your wishlist.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            onClick={() => handleDeleteWishlistItem(item?._id)}
                            type="submit"
                            variant="destructive"
                          >
                            Confirm Remove
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Wishlist;
