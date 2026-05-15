import { useState } from "react"

import { useForm } from "react-hook-form"

import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Checkbox } from "@/components/ui/checkbox"

import { useCreateJobRequirement } from "../hooks/use-create-job-requirement"

const schema = z.object({
  job_title: z.string().min(2),

  location: z.string().min(2),

  is_remote: z.boolean(),

  is_fresher: z.boolean(),

  is_intern: z.boolean(),
})

type FormValues = z.infer<typeof schema>

export function CreateJobRequirementDialog() {
  const [open, setOpen] =
    useState(false)

  const { mutateAsync, isPending } =
    useCreateJobRequirement()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      job_title: "",
      location: "",
      is_remote: true,
      is_fresher: true,
      is_intern: false,
    },
  })

  async function onSubmit(
    values: FormValues
  ) {
    try {
      await mutateAsync(values)

      reset()

      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-full">
          <Plus className="h-4 w-4" />
          Add Requirement
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Create Job Requirement
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label>
              Job Title
            </Label>

            <Input
              placeholder="Frontend Engineer"
              {...register(
                "job_title"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Location
            </Label>

            <Input
              placeholder="Remote"
              {...register("location")}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={watch(
                  "is_remote"
                )}
                onCheckedChange={(
                  checked
                ) =>
                  setValue(
                    "is_remote",
                    !!checked
                  )
                }
              />

              <Label>
                Remote Only
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                checked={watch(
                  "is_fresher"
                )}
                onCheckedChange={(
                  checked
                ) =>
                  setValue(
                    "is_fresher",
                    !!checked
                  )
                }
              />

              <Label>
                Fresher Friendly
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                checked={watch(
                  "is_intern"
                )}
                onCheckedChange={(
                  checked
                ) =>
                  setValue(
                    "is_intern",
                    !!checked
                  )
                }
              />

              <Label>
                Internship
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending
              ? "Creating..."
              : "Create Requirement"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}