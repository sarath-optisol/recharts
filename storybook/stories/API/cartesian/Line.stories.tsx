/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Surface, Line, ResponsiveContainer, ComposedChart, Legend, Tooltip, XAxis, YAxis } from '../../../../src';
import { coordinateData, pageData } from '../../data';
import { EventHandlers } from '../props/EventHandlers';
import { AnimationProps } from '../props/AnimationProps';
import { legendType } from '../props/Legend';
import { getStoryArgsFromArgsTypesObject } from '../props/utils';

const GeneralProps = {
  id: {
    description:
      'The unique id of this component, which will be used to generate unique clip path id internally. This props is suggested to be set in SSR.',
    type: { name: 'string' },
    table: { category: 'General' },
  },
  name: {
    type: { name: 'string | number' },
    description:
      'The name of data. This option will be used in tooltip and legend to represent a line. If no value was set to this option, the value of dataKey will be used alternatively.',
    table: { category: 'General' },
  },
  unit: {
    type: { name: 'string | number' },
    table: {
      category: 'General',
    },
  },
  xAxisId: {
    description: 'The id of x-axis which is corresponding to the data.',
    table: { type: { summary: 'string | number' }, category: 'General' },
  },
  yAxisId: {
    description: 'The id of y-axis which is corresponding to the data.',
    table: { type: { summary: 'string | number' }, category: 'General' },
  },
  dataKey: {
    description:
      'The key or getter of a group of data which should be unique in a LineChart. It could be an accessor function such as (row)=>value',
    table: {
      type: { summary: 'string | number | function' },
      category: 'General',
    },
  },
};
const ResponsiveProps = {
  activeDot: {
    description:
      'The active dot is shown when a user enters a line chart and this chart has tooltip. If set to false, no active dot will be drawn. If set to true, active dot will be drawn with the props calculated internally. If passed an object, active dot will be drawn, and the internally calculated props will be merged with the key value pairs of the passed object. If passed a ReactElement, the option can be the custom active dot element. If passed a function, the function will be called to render a customized active dot.',
    table: {
      type: {
        summary: 'Boolean | Object | ReactElement | Function',
        detail:
          '<Line dataKey="value" activeDot={false} />\n' +
          '<Line dataKey="value" activeDot={{ stroke: \'red\', strokeWidth: 2 }} />\n' +
          '<Line dataKey="value" activeDot={<CustomizedDot />} />\n' +
          '<Line dataKey="value" activeDot={renderDot} />',
      },
      defaultValue: true,
      category: 'Responsive',
    },
  },
  tooltipType: { table: { category: 'Responsive' }, control: { type: 'select' }, options: ['responsive', 'none'] },
};
const StyleProps = {
  connectNulls: {
    description: 'Whether to connect a graph line across null points.',
    table: {
      type: {
        summary: 'boolean',
      },
      category: 'Style',
    },
    defaultValue: false,
  },
  dot: {
    description:
      'If false set, dots will not be drawn. If true set, dots will be drawn which have the props calculated internally. If object set, dots will be drawn which have the props mergered by the internal calculated props and the option. If ReactElement set, the option can be the custom dot element.If set a function, the function will be called to render customized dot.',
    table: {
      type: {
        summary: 'Boolean | Object | ReactElement | Function',
        detail:
          '<Line dataKey="value" dot={false} />\n' +
          '<Line dataKey="value" dot={{ stroke: \'red\', strokeWidth: 2 }} />\n' +
          '<Line dataKey="value" dot={<CustomizedDot />} />\n' +
          '<Line dataKey="value" dot={renderDot} />',
      },
      category: 'Style',
      defaultValue: true,
    },
  },
  fill: {
    control: { type: 'color' },
    table: { category: 'Style' },
  },
  hide: {
    description: 'Hides the line when true, useful when toggling visibility state via legend',
    type: { name: 'boolean' },
    defaultValue: false,
    table: { category: 'Style' },
  },
  label: {
    description:
      'If false set, labels will not be drawn. If true set, labels will be drawn which have the props calculated internally. If object set, labels will be drawn which have the props mergered by the internal calculated props and the option. If ReactElement set, the option can be the custom label element. If set a function, the function will be called to render customized label.',
    table: {
      type: {
        summary: 'Boolean | Object | ReactElement | Function',
        detail:
          '<Line dataKey="value" label />\n' +
          '<Line dataKey="value" label={{ fill: \'red\', fontSize: 20 }} />\n' +
          '<Line dataKey="value" label={<CustomizedLabel />} />\n' +
          '<Line dataKey="value" label={renderLabel} />',
      },
      defaultValue: false,
      category: 'Style',
    },
  },
  stroke: {
    control: { type: 'color' },
    table: { category: 'Style' },
  },
  strokeDasharray: {
    description:
      'The pattern of dashes and gaps used to paint the line. https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray',
    table: {
      type: {
        summary: 'string',
      },
      category: 'Style',
    },
  },
  strokeWidth: {
    description: 'The width of the stroke.',
    table: {
      type: {
        summary: 'String | Number',
      },
      category: 'Style',
    },
    defaultValue: 1,
  },
  type: {
    description:
      "The interpolation type of line. It's the same as type in Area. And customized interpolation function can be set to type. https://github.com/d3/d3-shape#curves",
    options: [
      'basis',
      'basisClosed',
      'basisOpen',
      'linear',
      'linearClosed',
      'natural',
      'monotoneX',
      'monotoneY',
      'monotone',
      'step',
      'stepBefore',
      'stepAfter',
    ],
    default: 'linear',
    control: {
      type: 'select',
    },
    table: {
      category: 'Style',
    },
  },
};

export default {
  argTypes: {
    ...EventHandlers,
    ...AnimationProps,
    legendType,
    ...GeneralProps,
    ...ResponsiveProps,
    ...StyleProps,
    // Deprecated
    dangerouslySetInnerHTML: { table: { category: 'Deprecated' }, hide: true, disable: true },
    // Other
    baseLine: { table: { category: 'Other' } },
    left: { table: { category: 'Other' } },
    top: { table: { category: 'Other' } },
    xAxis: { table: { category: 'Other' } },
    yAxis: { table: { category: 'Other' } },
    // Internal
    points: {
      description:
        'The coordinates of points in the line, usually calculated internally. In most cases this should not be used.',
      table: {
        type: {
          summary: 'array',
          detail: '[{x: 12, y: 12, value: 240}]',
        },
        category: 'Internal',
      },
    },
    data: { table: { category: 'Internal' } },
    layout: {
      description: 'The layout of line, usually inherited from parent.',
      table: {
        type: {
          summary: 'horizontal | vertical',
        },
        category: 'Internal',
      },
    },
  },
  component: Line,
};

export const General = {
  render: (args: Record<string, any>) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
          data={pageData}
        >
          <Line isAnimationActive={false} dataKey="uv" {...args} />
          {/* All further components are added to show the interaction with the Line properties */}
          <Legend />
          <Tooltip />
          <XAxis dataKey="name" />
          <YAxis />
        </ComposedChart>
      </ResponsiveContainer>
    );
  },
  args: {
    ...
    (GeneralProps),
  },
  parameters: {
    controls: { include: Object.keys(GeneralProps) },
    docs: {
      description: {
        story: 'The dataKey defines the y-Values of a Line. Without an xAxis, the index is used for x.',
      },
    },
  },
};

export const Style = {
  ...General,
  args: {
    ...getStoryArgsFromArgsTypesObject(StyleProps),
    type: 'linear',
    connectNulls: true,
    stroke: 'red',
    fill: 'teal',
    strokeDasharray: '4 1',
    label: { fill: 'red', fontSize: 20 },
    dot: { stroke: 'green', strokeWidth: 2 },
  },
  parameters: {
    controls: { include: Object.keys(StyleProps) },
    docs: {
      description: {
        story:
          'The line is generated from the data by connecting the dots. ' +
          'The type and connectNulls define how the dots are used.',
      },
    },
  },
};

export const Responsive = {
  ...General,
  args: {
    ...getStoryArgsFromArgsTypesObject(ResponsiveProps),
    activeDot: { stroke: 'green', strokeWidth: 2 },
    tooltipType: 'responsive',
  },
  parameters: {
    controls: {
      include: Object.keys(ResponsiveProps),
      tooltipType: { type: 'select', options: ['responsive', 'none'] },
    },
    docs: {
      description: {
        story:
          'The line is generated from the data by connecting the dots. ' +
          'The type and connectNulls define how the dots are used.',
      },
    },
  },
};

export const Animation = {
  ...General,
  args: {
    ...getStoryArgsFromArgsTypesObject(AnimationProps),
    isAnimationActive: true,
  },
  parameters: {
    controls: { include: Object.keys(AnimationProps) },
    docs: {
      description: { story: 'Reloading the story triggers the animation.' },
    },
  },
};

const renderDot = (props: { cx: number; cy: number }) => {
  const { cx, cy } = props;

  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="green" viewBox="0 0 1024 1024">
      {/* eslint-disable-next-line max-len */}
      <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
    </svg>
  );
};

export const CustomizedDot = {
  ...General,
  args: {
    dot: renderDot,
  },
  parameters: {
    controls: { include: ['dot'] },
    docs: {
      description: {
        story: 'The dot of the line can be customized. Find further possible behaviour on the Dot stories.',
      },
    },
  },
};

const renderLabel = (props: { index: number; x: number; y: number }) => {
  const { index, x, y } = props;

  return (
    <text key={index} x={x} y={y} className="customized-label">
      {`Customized Label: ${x}, ${y}`}
    </text>
  );
};

export const CustomizedLabel = {
  ...General,
  args: {
    isAnimationActive: false,
    label: renderLabel,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const { getAllByText } = within(canvasElement);
    // to make getAllByText works
    await new Promise(r => setTimeout(r, 0));
    expect(getAllByText(/Customized Label/)).toHaveLength(pageData.length);
  },
  parameters: {
    controls: { include: ['label'] },
    docs: {
      description: {
        story: 'The dot of the line can be customized. Find further possible behaviour on the Dot stories.',
      },
    },
  },
};

export const Points = {
  render: (args: Record<string, any>) => {
    const { points } = args;

    const [surfaceWidth, surfaceHeight] = [600, 300];

    return (
      <ResponsiveContainer width="100%" height={surfaceHeight}>
        <Surface
          width={surfaceWidth}
          height={surfaceHeight}
          viewBox={{
            x: 0,
            y: 0,
            width: surfaceWidth,
            height: surfaceHeight,
          }}
        >
          <Line isAnimationActive={false} points={points} />
        </Surface>
      </ResponsiveContainer>
    );
  },
  args: {
    points: coordinateData,
  },
  parameters: {
    controls: { include: ['points'] },
    docs: {
      description: {
        story:
          'You can directly set the x and y coordinates of a Line via points. This overrides dataKey and data. ' +
          'The coordinate system of the points lies in the top right of the bounding box. ' +
          'Using points, a Line can even be used within only a Surface, without a Chart.',
      },
    },
  },
};
