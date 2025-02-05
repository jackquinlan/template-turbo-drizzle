"use client";

import React, { useState, useTransition } from "react";
import type { User } from "next-auth";
import { AlertTriangleIcon } from "lucide-react";

import { Alert } from "@repo/ui/components/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/alert-dialog";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/card";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { deleteAccountAction } from "@/actions/auth/delete-account";
import { Loading } from "@/components/loading";

export function DeleteAccountCard({ currentUser }: { currentUser: User }) {
  const [error, setError] = useState<string>("");
  const [isLoading, startTransition] = useTransition();
  const [confirmChecked, setConfirmChecked] = useState<boolean>(false);
  const [confirmName, setConfirmName] = useState<string>("");

  async function handleSubmit() {
    startTransition(async () => {
      deleteAccountAction({ id: currentUser.id ?? "" })
        .catch((error) => {
          if (error.message !== "NEXT_REDIRECT") setError(error.message);
        });
    });
  }
  const isDisabled =
    isLoading || confirmName !== currentUser.name || !confirmChecked;
  return (
    <AlertDialog>
      <Card className="shadow">
        <CardHeader className="border-b p-4">
          <CardTitle>Delete Account</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <div className="grid gap-4">
            <p className="text-muted-foreground text-sm">Be careful! You cannot undo this action.</p>
            {error && <Alert variant="destructive">{error}</Alert>}
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive" className="w-fit">
                Delete account
              </Button>
            </AlertDialogTrigger>
          </div>
        </CardContent>
      </Card>
      <AlertDialogContent className="top-[25%]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-1">
            <AlertTriangleIcon className="text-destructive h-5 w-5" /> Delete
            your account
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="pt-2">
          Are you sure you want to delete your account? All data associated with
          your account will be deleted immediately.
          <br />
          <span className="text-destructive font-medium">
            This action cannot be undone.
          </span>
        </AlertDialogDescription>
        <div className="-mt-4">
          <div className="pb-2 pt-4 text-sm font-normal">
            Enter your name{" "}
            <span className="font-medium">{currentUser.name}</span> to confirm.
          </div>
          <Input autoFocus onChange={(e) => setConfirmName(e.target.value)} />
          <div className="mb-2 mt-5 flex items-center gap-2">
            <Checkbox
              id="confirm"
              checked={confirmChecked}
              onCheckedChange={() => setConfirmChecked(!confirmChecked)}
            />
            <Label htmlFor="confirm" className="text-sm font-normal">
              I acknowledge that this action is permanent and cannot be undone.
            </Label>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} disabled={isDisabled}>
            {isLoading ? <Loading size="sm" /> : "Confirm Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
