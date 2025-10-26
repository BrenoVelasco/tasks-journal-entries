import { useState } from "react";
import {
  Table,
  TableHeader,
  Column,
  TableBody,
  Row,
  Cell,
  Badge,
  Button,
  Checkbox,
} from "../../components/ui";
import { TaskType, type Task } from "../../types";
import type { Selection } from "react-aria-components";

interface TaskTableProps {
  tasks: Task[];
  onRunTask?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
  onViewTask?: (taskId: string) => void;
}

export function TaskTable({
  tasks,
  onRunTask,
  onDeleteTask,
  onViewTask,
}: TaskTableProps) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  const getStatusVariant = (
    status: Task["status"]
  ): "pending" | "running" | "completed" | "failed" => {
    return status;
  };

  const getTypeLabel = (type: Task["type"]) => {
    switch (type) {
      case TaskType.POST_JOURNAL_ENTRY:
        return "Post Entry";
      case TaskType.REVERSE_JOURNAL_ENTRY:
        return "Reverse Entry";
      case TaskType.OTHER:
        return "Other";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Table
      aria-label="Tasks"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader>
        <Column width="5%">
          <Checkbox slot="selection" />
        </Column>
        <Column isRowHeader width="30%">
          Title
        </Column>
        <Column width="15%">Type</Column>
        <Column width="12%">Status</Column>
        <Column width="18%">Last Run</Column>
        <Column width="20%">Actions</Column>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <Row key={task.id} id={task.id}>
            <Cell>
              <Checkbox slot="selection" />
            </Cell>
            <Cell>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-gray-900">
                  {task.title}
                </span>
                {task.description && (
                  <span className="text-xs text-gray-500 leading-tight">
                    {task.description}
                  </span>
                )}
                {task.lastRunError && (
                  <span className="text-xs text-red-600 leading-tight">
                    Error: {task.lastRunError}
                  </span>
                )}
              </div>
            </Cell>
            <Cell>
              <Badge variant="default" className="text-xs">
                {getTypeLabel(task.type)}
              </Badge>
            </Cell>
            <Cell>
              <Badge
                variant={getStatusVariant(task.status)}
                className="text-xs"
              >
                {task.status}
              </Badge>
            </Cell>
            <Cell>
              <span className="text-xs text-gray-600 whitespace-nowrap">
                {formatDate(task.lastRunAt)}
              </span>
            </Cell>
            <Cell>
              <div className="flex gap-1">
                <Button
                  variant="secondary"
                  size="sm"
                  onPress={() => onViewTask?.(task.id)}
                  className="text-xs"
                >
                  View
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onPress={() => onRunTask?.(task.id)}
                  className="text-xs"
                >
                  Run
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onPress={() => onDeleteTask?.(task.id)}
                  className="text-xs"
                >
                  Delete
                </Button>
              </div>
            </Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  );
}
