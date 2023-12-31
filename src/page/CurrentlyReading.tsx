import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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
  useFinishedReadingBookMutation,
  useGetCurrentlyReadingQuery,
} from "@/redux/features/api/apiSlice";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import { setCurrentlyReadingBook } from "@/redux/features/product/productSlice";

const CurrentlyReading = () => {
  const {
    user: { user },
    product: { products, currentlyReading },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const { data: currentlyReadingData, isLoading: isCurrentlyReadingLoading } =
    useGetCurrentlyReadingQuery(user?.email, {
      refetchOnMountOrArgChange: true,
    });

  if (currentlyReadingData?.length) {
    dispatch(setCurrentlyReadingBook(currentlyReadingData));
  }

  const [finishedReadingBook, { error }] = useFinishedReadingBookMutation();
  const matchingProducts: any = products.filter((product: { _id: string }) =>
    currentlyReading?.some((item: any) => item.productId === product._id)
  );

  if (isCurrentlyReadingLoading) {
    return <Loader />;
  }

  const confirmFinishRading = async (id: string | undefined) => {
    const result = await finishedReadingBook(id);
    if ("data" in result) {
      if (result?.data?.acknowledged) {
        toast({
          title: "Success",
          description: "Congratulations You have finished reading this book",
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
          {matchingProducts?.map((item: IProduct, index: number) => (
            <TableRow key={item?._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="flex gap-5">
                <div>
                  <img src={item?.photo} alt="" className="w-10 h-16" />
                </div>
                <div>
                  <p>{item?.title}</p>
                  <p className="text-sm italic">{item?.genre}</p>
                </div>
              </TableCell>
              <TableCell>
                <p>{item?.author}</p>
              </TableCell>
              <TableCell>
                <div>
                  <button className="text-[12px] px-3 py-1 rounded-full mr-2 bg-slate-900 text-white hover:bg-slate-700">
                    Continue Reading
                  </button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-[12px] px-3 py-1 rounded-full mr-2 bg-red-500 text-white hover:bg-red-600">
                        Finish Reading
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          Finished Reading? - {item?.title}
                        </DialogTitle>
                        <DialogDescription>
                          Are you sure? you finished the "{item?.title}" book.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          onClick={() => confirmFinishRading(item?._id)}
                          type="submit"
                          variant="destructive"
                        >
                          Confirm Finish
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
    </div>
  );
};

export default CurrentlyReading;
