import { useGetPermissions } from "@/lib/dataAccess";
import { Card, CardContent, Link } from "@/lib/ui";

export const CounterPicker = () => {
  const { data } = useGetPermissions();

  return (
    <Card>
      <CardContent>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {data?.data.map((permission) => (
            <li key={permission.organizer.id} style={{ marginBottom: 6 }}>
              <Link>{permission.organizer.name}</Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
