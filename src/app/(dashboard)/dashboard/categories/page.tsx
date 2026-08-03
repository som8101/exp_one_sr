import { getCategories } from "@/actions/categories";
import { CategoryForm } from "@/components/categories/category-form";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { format } from "date-fns";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage the categories used to organize your campaigns.</p>
        </div>
        
        <Dialog>
          <DialogTrigger render={
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Create Category
            </Button>
          } />
          <DialogContent>
            <CategoryForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Campaigns</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category._count.campaigns}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger render={<Button variant="ghost" size="sm">Edit</Button>} />
                    <DialogContent>
                      <CategoryForm initialData={category} />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
