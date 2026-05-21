import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Label,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  Switch,
  RadioGroup,
  RadioGroupItem,
} from '@ui-platform/ui';
import { VStack, HStack, Grid, GridItem } from '@ui-platform/layouts';
import { toast } from '@ui-platform/state';

export function FormDemo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    notifications: true,
    marketing: false,
    plan: 'pro',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Form submitted successfully!', {
      description: 'Your information has been saved.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Enter your information to create a new account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <VStack gap="xl" align="stretch">
            <Grid columns={2} gap="lg">
              <GridItem>
                <VStack gap="xs" align="stretch">
                  <Label htmlFor="firstName" required>First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </VStack>
              </GridItem>
              <GridItem>
                <VStack gap="xs" align="stretch">
                  <Label htmlFor="lastName" required>Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </VStack>
              </GridItem>
            </Grid>

            <VStack gap="xs" align="stretch">
              <Label htmlFor="email" required>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </VStack>

            <VStack gap="xs" align="stretch">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="Acme Inc."
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </VStack>

            <VStack gap="xs" align="stretch">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </VStack>

            <VStack gap="md" align="stretch">
              <Label>Plan</Label>
              <RadioGroup
                value={formData.plan}
                onValueChange={(value) => setFormData({ ...formData, plan: value })}
                className="grid grid-cols-3 gap-[var(--spacing-gap-md)]"
              >
                {[
                  { value: 'starter', label: 'Starter', price: '$9/mo' },
                  { value: 'pro', label: 'Pro', price: '$29/mo' },
                  { value: 'enterprise', label: 'Enterprise', price: '$99/mo' },
                ].map((plan) => (
                  <label
                    key={plan.value}
                    className={`flex flex-col items-center gap-[var(--spacing-xs)] p-[var(--spacing-lg)] rounded-[var(--radius-lg)] border cursor-pointer transition-colors ${
                      formData.plan === plan.value
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-muted)]'
                        : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
                    }`}
                  >
                    <RadioGroupItem value={plan.value} className="sr-only" />
                    <span className="font-medium">{plan.label}</span>
                    <span className="text-sm text-[var(--color-foreground-muted)]">
                      {plan.price}
                    </span>
                  </label>
                ))}
              </RadioGroup>
            </VStack>

            <VStack gap="md" align="stretch">
              <HStack justify="between" align="center" fullWidth>
                <VStack gap="2xs" align="start">
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <span className="text-sm text-[var(--color-foreground-muted)]">
                    Receive email updates about your account
                  </span>
                </VStack>
                <Switch
                  id="notifications"
                  checked={formData.notifications}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, notifications: checked })
                  }
                />
              </HStack>

              <HStack gap="sm" align="center">
                <Checkbox
                  id="marketing"
                  checked={formData.marketing}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, marketing: checked === true })
                  }
                />
                <Label htmlFor="marketing" className="cursor-pointer">
                  I agree to receive marketing emails
                </Label>
              </HStack>
            </VStack>
          </VStack>
        </CardContent>
        <CardFooter className="flex justify-end gap-[var(--spacing-gap-sm)]">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">
            Create Account
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
