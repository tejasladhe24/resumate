"use client"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "@workspace/ui/components/field"
import { Switch } from "@workspace/ui/components/switch"
import { useAuth } from "@/components/auth-provider"

export const SettingsView = () => {
  const { user } = useAuth()
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [aiSuggestions, setAiSuggestions] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your app preferences and notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field orientation="horizontal">
              <Switch
                checked={emailUpdates}
                onCheckedChange={setEmailUpdates}
                aria-label="Toggle email updates"
              />
              <FieldContent>
                <FieldLabel>
                  <FieldTitle>Email updates</FieldTitle>
                </FieldLabel>
                <FieldDescription>
                  Receive updates when resume tailoring is complete.
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field orientation="horizontal">
              <Switch
                checked={aiSuggestions}
                onCheckedChange={setAiSuggestions}
                aria-label="Toggle AI suggestions"
              />
              <FieldContent>
                <FieldLabel>
                  <FieldTitle>AI suggestions</FieldTitle>
                </FieldLabel>
                <FieldDescription>
                  Show AI improvement suggestions while editing resume points.
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field orientation="horizontal">
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                aria-label="Toggle dark mode"
              />
              <FieldContent>
                <FieldLabel>
                  <FieldTitle>Dark mode</FieldTitle>
                </FieldLabel>
                <FieldDescription>
                  Enable dark appearance for your dashboard.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          <Button variant="secondary">Save preferences</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
