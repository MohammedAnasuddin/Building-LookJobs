import { useState } from "react";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Progress } from "@/components/ui/progress";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";

import { useCreateJobRequirement } from "../hooks/use-create-job-requirement";

const schema = z.object({
  job_title: z.string().min(2),

  location: z.string().min(2),

  is_remote: z.boolean(),

  is_fresher: z.boolean(),

  is_intern: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

type CreateJobRequirementDialogProps = {
  onCreated?: (requirementId: string) => void;
};

export function CreateJobRequirementDialog({
  onCreated,
}: CreateJobRequirementDialogProps) {
  const [open, setOpen] = useState(false);

  const [progress, setProgress] = useState(0);

  const [statusText, setStatusText] = useState("");

  const { mutateAsync, isPending } = useCreateJobRequirement();

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormValues>({
      resolver: zodResolver(schema),

      defaultValues: {
        job_title: "",

        location: "",

        is_remote: true,

        is_fresher: true,

        is_intern: false,
      },
    });

  async function onSubmit(values: FormValues) {
    try {
      setProgress(20);

      setStatusText("Creating requirement...");

      await new Promise((resolve) => setTimeout(resolve, 400));

      setProgress(45);

      setStatusText("Starting scraper...");

      const result = await mutateAsync(values);

      const requirement = result.data;

      onCreated?.(requirement.job_req_id);

      setProgress(80);

      setStatusText("Preparing feed...");

      await new Promise((resolve) => setTimeout(resolve, 500));

      setProgress(100);

      setStatusText("Done");

      await new Promise((resolve) => setTimeout(resolve, 300));

      reset();

      setProgress(0);

      setStatusText("");

      setOpen(false);
    } catch (error) {
      console.error(error);

      setProgress(0);

      setStatusText("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-full">
          <Plus className="h-4 w-4" />
          Add Requirement
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Job Requirement</DialogTitle>

          <DialogDescription>
            Create a personalized job tracking feed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label>Job Title</Label>

            <Input placeholder="Frontend Engineer" {...register("job_title")} />
          </div>

          <div className="space-y-2">
            <Label>Location</Label>

            <Input placeholder="Remote" {...register("location")} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={watch("is_remote")}
                onCheckedChange={(checked) => setValue("is_remote", !!checked)}
              />

              <Label>Remote Only</Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                checked={watch("is_fresher")}
                onCheckedChange={(checked) => setValue("is_fresher", !!checked)}
              />

              <Label>Fresher Friendly</Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                checked={watch("is_intern")}
                onCheckedChange={(checked) => setValue("is_intern", !!checked)}
              />

              <Label>Internship</Label>
            </div>
          </div>

          {isPending && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{statusText}</span>

                <span>{progress}%</span>
              </div>

              <Progress value={progress} />
            </div>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Creating..." : "Create Requirement"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
