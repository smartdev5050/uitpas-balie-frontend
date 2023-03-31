import { Organizer, useGetPermissions } from "@/lib/dataAccess";
import { Card, CardContent, Link } from "@/lib/ui";
import { useSetActiveCounter } from "@/feature-counter/context/useSetActiveCounter";

export const CounterPicker = () => {
  const { data } = useGetPermissions();
  const setActiveCounter = useSetActiveCounter();

  const createHandleClick = (organizer: Organizer) => () => {
    setActiveCounter(organizer);
  };

  return (
    <Card>
      <CardContent>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {data?.data.map((permission) => (
            <li key={permission.organizer.id} style={{ marginBottom: 6 }}>
              <Link onClick={createHandleClick(permission.organizer)}>
                {permission.organizer.name}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
