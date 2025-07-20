import React, { useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const [search, setSearch] = useState('');
  const filteredData = ordersData.filter(order =>
    Object.values(order).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );
  // Calculate summary row (example: total amount)
  const totalAmount = filteredData.reduce((sum, order) => sum + (order.TotalAmount || 0), 0);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      {/* Quick Search */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Quick search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <GridComponent
        id="gridcomp"
        dataSource={filteredData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        rowSelected={args => args.row && (args.row.style.background = '#f3f4f6')}
        rowDataBound={args => args.row && (args.row.style.transition = 'background 0.2s')}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        {/* Summary Row */}
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
      {/* Summary Row Display */}
      <div className="mt-4 text-right text-lg font-semibold text-gray-700">
        Total Amount: <span className="text-blue-600">${totalAmount.toLocaleString()}</span>
      </div>
    </div>
  );
};
export default Orders;
