// Framework modules
import {
  List,
  Table,
  Space,
  useTable,
  useMany,
  TextField,

  EditButton,
  ShowButton,
  DeleteButton,
  usePermissions,
  IResourceComponentsProps
} from "@pankod/refine"


// Project modules
import { ICategory, IOrder } from "interface"

export const OrderList: React.FC<IResourceComponentsProps> = () => {
    // Load all orders -> load order detail
  
    const { tableProps } = useTable<IOrder>();

    const categoryIds = tableProps.dataSource?.map((item) => item.category.id) ?? [];

    const { data, isLoading } = useMany<ICategory>({
      resource: "categories",
      ids: categoryIds,
      queryOptions: {
        enabled: categoryIds.length > 0,
      }
    })

    const { data: permissionsData } = usePermissions();

    return (
      <List canCreate={permissionsData?.includes("admin")}>
        <Table {...tableProps} rowKey={"id"}>
          <Table.Column dataIndex={"id"} title="ID"/>
          <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.title
                                }
                            />
                        );
                    }}
                />
                <Table.Column<IOrder>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            {permissionsData?.includes("admin") && (
                                <DeleteButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                            )}
                        </Space>
                    )}
                />
        </Table>
      </List>
    )
}