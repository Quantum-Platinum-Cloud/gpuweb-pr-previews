// Copyright (C) [2022] World Wide Web Consortium,
// (Massachusetts Institute of Technology, European Research Consortium for
// Informatics and Mathematics, Keio University, Beihang).
// All Rights Reserved.
//
// This work is distributed under the W3C (R) Software License [1] in the hope
// that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
// warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//
// [1] http://www.w3.org/Consortium/Legal/copyright-software

// **** This file is auto-generated. Do not edit. ****

module.exports = grammar({
    name: 'wgsl',

    externals: $ => [
        $._block_comment,
    ],

    extras: $ => [
        $._comment,
        $._block_comment,
        $._blankspace,
    ],

    inline: $ => [
        $.global_decl,
        $._reserved,
    ],

    // WGSL has no parsing conflicts.
    conflicts: $ => [],

    word: $ => $.ident_pattern_token,

    rules: {
        translation_unit: $ => seq(optional(repeat1($.global_directive)), optional(repeat1($.global_decl))),
        global_directive: $ => $.enable_directive,
        global_decl: $ => choice(
            $.semicolon,
            seq($.global_variable_decl, $.semicolon),
            seq($.global_constant_decl, $.semicolon),
            seq($.type_alias_decl, $.semicolon),
            $.struct_decl,
            $.function_decl,
            seq($.static_assert_statement, $.semicolon)
        ),
        bool_literal: $ => choice(
            $.true,
            $.false
        ),
        int_literal: $ => choice(
            $.decimal_int_literal,
            $.hex_int_literal
        ),
        decimal_int_literal: $ => choice(
            token(/0[iu]?/),
            token(/[1-9][0-9]*[iu]?/)
        ),
        hex_int_literal: $ => token(/0[xX][0-9a-fA-F]+[iu]?/),
        float_literal: $ => choice(
            $.decimal_float_literal,
            $.hex_float_literal
        ),
        decimal_float_literal: $ => choice(
            token(/0[fh]/),
            token(/[1-9][0-9]*[fh]/),
            token(/[0-9]*\.[0-9]+([eE][+-]?[0-9]+)?[fh]?/),
            token(/[0-9]+\.[0-9]*([eE][+-]?[0-9]+)?[fh]?/),
            token(/[0-9]+[eE][+-]?[0-9]+[fh]?/)
        ),
        hex_float_literal: $ => choice(
            token(/0[xX][0-9a-fA-F]*\.[0-9a-fA-F]+([pP][+-]?[0-9]+[fh]?)?/),
            token(/0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*([pP][+-]?[0-9]+[fh]?)?/),
            token(/0[xX][0-9a-fA-F]+[pP][+-]?[0-9]+[fh]?/)
        ),
        literal: $ => choice(
            $.int_literal,
            $.float_literal,
            $.bool_literal
        ),
        member_ident: $ => $.ident_pattern_token,
        attribute: $ => choice(
            seq($.attr, token('align'), $.paren_left, $.expression, $.attrib_end),
            seq($.attr, token('binding'), $.paren_left, $.expression, $.attrib_end),
            seq($.attr, token('builtin'), $.paren_left, $.builtin_value_name, $.attrib_end),
            seq($.attr, token('const')),
            seq($.attr, token('group'), $.paren_left, $.expression, $.attrib_end),
            seq($.attr, token('id'), $.paren_left, $.expression, $.attrib_end),
            seq($.attr, token('interpolate'), $.paren_left, $.interpolation_type_name, $.attrib_end),
            seq($.attr, token('interpolate'), $.paren_left, $.interpolation_type_name, $.comma, $.interpolation_sample_name, $.attrib_end),
            seq($.attr, token('invariant')),
            seq($.attr, token('location'), $.paren_left, $.expression, $.attrib_end),
            seq($.attr, token('size'), $.paren_left, $.expression, $.attrib_end),
            seq($.attr, token('workgroup_size'), $.paren_left, $.expression, $.attrib_end),
            seq($.attr, token('workgroup_size'), $.paren_left, $.expression, $.comma, $.expression, $.attrib_end),
            seq($.attr, token('workgroup_size'), $.paren_left, $.expression, $.comma, $.expression, $.comma, $.expression, $.attrib_end),
            seq($.attr, token('vertex')),
            seq($.attr, token('fragment')),
            seq($.attr, token('compute'))
        ),
        attrib_end: $ => seq(optional($.comma), $.paren_right),
        array_type_specifier: $ => seq($.array, $.less_than, $.type_specifier, optional(seq($.comma, $.element_count_expression)), $.greater_than),
        element_count_expression: $ => choice(
            $.additive_expression,
            $.bitwise_expression
        ),
        struct_decl: $ => seq($.struct, $.ident, $.struct_body_decl),
        struct_body_decl: $ => seq($.brace_left, $.struct_member, optional(repeat1(seq($.comma, $.struct_member))), optional($.comma), $.brace_right),
        struct_member: $ => seq(optional(repeat1($.attribute)), $.member_ident, $.colon, $.type_specifier),
        texture_and_sampler_types: $ => choice(
            $.sampler_type,
            $.depth_texture_type,
            seq($.sampled_texture_type, $.less_than, $.type_specifier, $.greater_than),
            seq($.multisampled_texture_type, $.less_than, $.type_specifier, $.greater_than),
            seq($.storage_texture_type, $.less_than, $.texel_format, $.comma, $.access_mode, $.greater_than)
        ),
        sampler_type: $ => choice(
            $.sampler,
            $.sampler_comparison
        ),
        sampled_texture_type: $ => choice(
            $.texture_1d,
            $.texture_2d,
            $.texture_2d_array,
            $.texture_3d,
            $.texture_cube,
            $.texture_cube_array
        ),
        multisampled_texture_type: $ => $.texture_multisampled_2d,
        storage_texture_type: $ => choice(
            $.texture_storage_1d,
            $.texture_storage_2d,
            $.texture_storage_2d_array,
            $.texture_storage_3d
        ),
        depth_texture_type: $ => choice(
            $.texture_depth_2d,
            $.texture_depth_2d_array,
            $.texture_depth_cube,
            $.texture_depth_cube_array,
            $.texture_depth_multisampled_2d
        ),
        type_alias_decl: $ => seq($.type, $.ident, $.equal, $.type_specifier),
        type_specifier: $ => choice(
            $.ident,
            $.type_specifier_without_ident
        ),
        type_specifier_without_ident: $ => choice(
            $.bool,
            $.float32,
            $.float16,
            $.int32,
            $.uint32,
            seq($.vec_prefix, $.less_than, $.type_specifier, $.greater_than),
            seq($.mat_prefix, $.less_than, $.type_specifier, $.greater_than),
            seq($.pointer, $.less_than, $.address_space, $.comma, $.type_specifier, optional(seq($.comma, $.access_mode)), $.greater_than),
            $.array_type_specifier,
            seq($.atomic, $.less_than, $.type_specifier, $.greater_than),
            $.texture_and_sampler_types
        ),
        vec_prefix: $ => choice(
            $.vec2,
            $.vec3,
            $.vec4
        ),
        mat_prefix: $ => choice(
            $.mat2x2,
            $.mat2x3,
            $.mat2x4,
            $.mat3x2,
            $.mat3x3,
            $.mat3x4,
            $.mat4x2,
            $.mat4x3,
            $.mat4x4
        ),
        variable_statement: $ => choice(
            $.variable_decl,
            seq($.variable_decl, $.equal, $.expression),
            seq($.let, $.optionally_typed_ident, $.equal, $.expression),
            seq($.const, $.optionally_typed_ident, $.equal, $.expression)
        ),
        variable_decl: $ => seq($.var, optional($.variable_qualifier), $.optionally_typed_ident),
        optionally_typed_ident: $ => seq($.ident, optional(seq($.colon, $.type_specifier))),
        variable_qualifier: $ => seq($.less_than, $.address_space, optional(seq($.comma, $.access_mode)), $.greater_than),
        global_variable_decl: $ => seq(optional(repeat1($.attribute)), $.variable_decl, optional(seq($.equal, $.expression))),
        global_constant_decl: $ => choice(
            seq($.const, $.optionally_typed_ident, $.equal, $.expression),
            seq(optional(repeat1($.attribute)), $.override, $.optionally_typed_ident, optional(seq($.equal, $.expression)))
        ),
        primary_expression: $ => choice(
            $.ident,
            seq($.callable, $.argument_expression_list),
            $.literal,
            $.paren_expression,
            seq($.bitcast, $.less_than, $.type_specifier, $.greater_than, $.paren_expression)
        ),
        callable: $ => choice(
            $.ident,
            $.type_specifier_without_ident,
            $.vec_prefix,
            $.mat_prefix,
            $.array
        ),
        paren_expression: $ => seq($.paren_left, $.expression, $.paren_right),
        argument_expression_list: $ => seq($.paren_left, optional(seq($.expression, optional(repeat1(seq($.comma, $.expression))), optional($.comma))), $.paren_right),
        component_or_swizzle_specifier: $ => choice(
            seq($.bracket_left, $.expression, $.bracket_right, optional($.component_or_swizzle_specifier)),
            seq($.period, $.member_ident, optional($.component_or_swizzle_specifier)),
            seq($.period, $.swizzle_name, optional($.component_or_swizzle_specifier))
        ),
        unary_expression: $ => choice(
            $.singular_expression,
            seq($.minus, $.unary_expression),
            seq($.bang, $.unary_expression),
            seq($.tilde, $.unary_expression),
            seq($.star, $.unary_expression),
            seq($.and, $.unary_expression)
        ),
        singular_expression: $ => seq($.primary_expression, optional($.component_or_swizzle_specifier)),
        lhs_expression: $ => seq(optional(repeat1(choice($.star, $.and))), $.core_lhs_expression, optional($.component_or_swizzle_specifier)),
        core_lhs_expression: $ => choice(
            $.ident,
            seq($.paren_left, $.lhs_expression, $.paren_right)
        ),
        multiplicative_expression: $ => choice(
            $.unary_expression,
            seq($.multiplicative_expression, $.multiplicative_operator, $.unary_expression)
        ),
        multiplicative_operator: $ => choice(
            $.star,
            $.forward_slash,
            $.modulo
        ),
        additive_expression: $ => choice(
            $.multiplicative_expression,
            seq($.additive_expression, $.additive_operator, $.multiplicative_expression)
        ),
        additive_operator: $ => choice(
            $.plus,
            $.minus
        ),
        shift_expression: $ => choice(
            $.additive_expression,
            seq($.unary_expression, $.shift_left, $.unary_expression),
            seq($.unary_expression, $.shift_right, $.unary_expression)
        ),
        relational_expression: $ => choice(
            $.shift_expression,
            seq($.shift_expression, $.less_than, $.shift_expression),
            seq($.shift_expression, $.greater_than, $.shift_expression),
            seq($.shift_expression, $.less_than_equal, $.shift_expression),
            seq($.shift_expression, $.greater_than_equal, $.shift_expression),
            seq($.shift_expression, $.equal_equal, $.shift_expression),
            seq($.shift_expression, $.not_equal, $.shift_expression)
        ),
        short_circuit_and_expression: $ => choice(
            $.relational_expression,
            seq($.short_circuit_and_expression, $.and_and, $.relational_expression)
        ),
        short_circuit_or_expression: $ => choice(
            $.relational_expression,
            seq($.short_circuit_or_expression, $.or_or, $.relational_expression)
        ),
        binary_or_expression: $ => choice(
            $.unary_expression,
            seq($.binary_or_expression, $.or, $.unary_expression)
        ),
        binary_and_expression: $ => choice(
            $.unary_expression,
            seq($.binary_and_expression, $.and, $.unary_expression)
        ),
        binary_xor_expression: $ => choice(
            $.unary_expression,
            seq($.binary_xor_expression, $.xor, $.unary_expression)
        ),
        bitwise_expression: $ => choice(
            seq($.binary_and_expression, $.and, $.unary_expression),
            seq($.binary_or_expression, $.or, $.unary_expression),
            seq($.binary_xor_expression, $.xor, $.unary_expression)
        ),
        expression: $ => choice(
            $.relational_expression,
            seq($.short_circuit_or_expression, $.or_or, $.relational_expression),
            seq($.short_circuit_and_expression, $.and_and, $.relational_expression),
            $.bitwise_expression
        ),
        compound_statement: $ => seq($.brace_left, optional(repeat1($.statement)), $.brace_right),
        assignment_statement: $ => choice(
            seq($.lhs_expression, choice($.equal, $.compound_assignment_operator), $.expression),
            seq($.underscore, $.equal, $.expression)
        ),
        compound_assignment_operator: $ => choice(
            $.plus_equal,
            $.minus_equal,
            $.times_equal,
            $.division_equal,
            $.modulo_equal,
            $.and_equal,
            $.or_equal,
            $.xor_equal,
            $.shift_right_equal,
            $.shift_left_equal
        ),
        increment_statement: $ => seq($.lhs_expression, $.plus_plus),
        decrement_statement: $ => seq($.lhs_expression, $.minus_minus),
        if_statement: $ => seq($.if_clause, optional(repeat1($.else_if_clause)), optional($.else_clause)),
        if_clause: $ => seq($.if, $.expression, $.compound_statement),
        else_if_clause: $ => seq($.else, $.if, $.expression, $.compound_statement),
        else_clause: $ => seq($.else, $.compound_statement),
        switch_statement: $ => seq($.switch, $.expression, $.brace_left, repeat1($.switch_body), $.brace_right),
        switch_body: $ => choice(
            $.case_clause,
            $.default_alone_clause
        ),
        case_clause: $ => seq($.case, $.case_selectors, optional($.colon), $.compound_statement),
        default_alone_clause: $ => seq($.default, optional($.colon), $.compound_statement),
        case_selectors: $ => seq($.case_selector, optional(repeat1(seq($.comma, $.case_selector))), optional($.comma)),
        case_selector: $ => choice(
            $.default,
            $.expression
        ),
        loop_statement: $ => seq($.loop, $.brace_left, optional(repeat1($.statement)), optional($.continuing_statement), $.brace_right),
        for_statement: $ => seq($.for, $.paren_left, $.for_header, $.paren_right, $.compound_statement),
        for_header: $ => seq(optional($.for_init), $.semicolon, optional($.expression), $.semicolon, optional($.for_update)),
        for_init: $ => choice(
            $.variable_statement,
            $.variable_updating_statement,
            $.func_call_statement
        ),
        for_update: $ => choice(
            $.variable_updating_statement,
            $.func_call_statement
        ),
        while_statement: $ => seq($.while, $.expression, $.compound_statement),
        break_statement: $ => $.break,
        break_if_statement: $ => seq($.break, $.if, $.expression, $.semicolon),
        continue_statement: $ => $.continue,
        continuing_statement: $ => seq($.continuing, $.continuing_compound_statement),
        continuing_compound_statement: $ => seq($.brace_left, optional(repeat1($.statement)), optional($.break_if_statement), $.brace_right),
        return_statement: $ => seq($.return, optional($.expression)),
        func_call_statement: $ => seq($.ident, $.argument_expression_list),
        static_assert_statement: $ => seq($.static_assert, $.expression),
        statement: $ => choice(
            $.semicolon,
            seq($.return_statement, $.semicolon),
            $.if_statement,
            $.switch_statement,
            $.loop_statement,
            $.for_statement,
            $.while_statement,
            seq($.func_call_statement, $.semicolon),
            seq($.variable_statement, $.semicolon),
            seq($.break_statement, $.semicolon),
            seq($.continue_statement, $.semicolon),
            seq($.discard, $.semicolon),
            seq($.variable_updating_statement, $.semicolon),
            $.compound_statement,
            seq($.static_assert_statement, $.semicolon)
        ),
        variable_updating_statement: $ => choice(
            $.assignment_statement,
            $.increment_statement,
            $.decrement_statement
        ),
        function_decl: $ => seq(optional(repeat1($.attribute)), $.function_header, $.compound_statement),
        function_header: $ => seq($.fn, $.ident, $.paren_left, optional($.param_list), $.paren_right, optional(seq($.arrow, optional(repeat1($.attribute)), $.type_specifier))),
        param_list: $ => seq($.param, optional(repeat1(seq($.comma, $.param))), optional($.comma)),
        param: $ => seq(optional(repeat1($.attribute)), $.ident, $.colon, $.type_specifier),
        enable_directive: $ => seq($.enable, $.extension_name, $.semicolon),
        ident_pattern_token: $ => token(/([_\p{XID_Start}][\p{XID_Continue}]+)|([\p{XID_Start}])/uy),
        array: $ => token('array'),
        atomic: $ => token('atomic'),
        bool: $ => token('bool'),
        float32: $ => token('f32'),
        float16: $ => token('f16'),
        int32: $ => token('i32'),
        mat2x2: $ => token('mat2x2'),
        mat2x3: $ => token('mat2x3'),
        mat2x4: $ => token('mat2x4'),
        mat3x2: $ => token('mat3x2'),
        mat3x3: $ => token('mat3x3'),
        mat3x4: $ => token('mat3x4'),
        mat4x2: $ => token('mat4x2'),
        mat4x3: $ => token('mat4x3'),
        mat4x4: $ => token('mat4x4'),
        pointer: $ => token('ptr'),
        sampler: $ => token('sampler'),
        sampler_comparison: $ => token('sampler_comparison'),
        texture_1d: $ => token('texture_1d'),
        texture_2d: $ => token('texture_2d'),
        texture_2d_array: $ => token('texture_2d_array'),
        texture_3d: $ => token('texture_3d'),
        texture_cube: $ => token('texture_cube'),
        texture_cube_array: $ => token('texture_cube_array'),
        texture_multisampled_2d: $ => token('texture_multisampled_2d'),
        texture_storage_1d: $ => token('texture_storage_1d'),
        texture_storage_2d: $ => token('texture_storage_2d'),
        texture_storage_2d_array: $ => token('texture_storage_2d_array'),
        texture_storage_3d: $ => token('texture_storage_3d'),
        texture_depth_2d: $ => token('texture_depth_2d'),
        texture_depth_2d_array: $ => token('texture_depth_2d_array'),
        texture_depth_cube: $ => token('texture_depth_cube'),
        texture_depth_cube_array: $ => token('texture_depth_cube_array'),
        texture_depth_multisampled_2d: $ => token('texture_depth_multisampled_2d'),
        uint32: $ => token('u32'),
        vec2: $ => token('vec2'),
        vec3: $ => token('vec3'),
        vec4: $ => token('vec4'),
        bitcast: $ => token('bitcast'),
        break: $ => token('break'),
        case: $ => token('case'),
        const: $ => token('const'),
        continue: $ => token('continue'),
        continuing: $ => token('continuing'),
        default: $ => token('default'),
        discard: $ => token('discard'),
        else: $ => token('else'),
        enable: $ => token('enable'),
        false: $ => token('false'),
        fn: $ => token('fn'),
        for: $ => token('for'),
        if: $ => token('if'),
        let: $ => token('let'),
        loop: $ => token('loop'),
        override: $ => token('override'),
        return: $ => token('return'),
        static_assert: $ => token('static_assert'),
        struct: $ => token('struct'),
        switch: $ => token('switch'),
        true: $ => token('true'),
        type: $ => token('type'),
        var: $ => token('var'),
        while: $ => token('while'),
        and: $ => token('&'),
        and_and: $ => token('&&'),
        arrow: $ => token('->'),
        attr: $ => token('@'),
        forward_slash: $ => token('/'),
        bang: $ => token('!'),
        bracket_left: $ => token('['),
        bracket_right: $ => token(']'),
        brace_left: $ => token('{'),
        brace_right: $ => token('}'),
        colon: $ => token(':'),
        comma: $ => token(','),
        equal: $ => token('='),
        equal_equal: $ => token('=='),
        not_equal: $ => token('!='),
        greater_than: $ => token('>'),
        greater_than_equal: $ => token('>='),
        shift_right: $ => token('>>'),
        less_than: $ => token('<'),
        less_than_equal: $ => token('<='),
        shift_left: $ => token('<<'),
        modulo: $ => token('%'),
        minus: $ => token('-'),
        minus_minus: $ => token('--'),
        period: $ => token('.'),
        plus: $ => token('+'),
        plus_plus: $ => token('++'),
        or: $ => token('|'),
        or_or: $ => token('||'),
        paren_left: $ => token('('),
        paren_right: $ => token(')'),
        semicolon: $ => token(';'),
        star: $ => token('*'),
        tilde: $ => token('~'),
        underscore: $ => token('_'),
        xor: $ => token('^'),
        plus_equal: $ => token('+='),
        minus_equal: $ => token('-='),
        times_equal: $ => token('*='),
        division_equal: $ => token('/='),
        modulo_equal: $ => token('%='),
        and_equal: $ => token('&='),
        or_equal: $ => token('|='),
        xor_equal: $ => token('^='),
        shift_right_equal: $ => token('>>='),
        shift_left_equal: $ => token('<<='),
        interpolation_type_name: $ => choice(
            token('perspective'),
            token('linear'),
            token('flat')
        ),
        interpolation_sample_name: $ => choice(
            token('center'),
            token('centroid'),
            token('sample')
        ),
        builtin_value_name: $ => choice(
            token('vertex_index'),
            token('instance_index'),
            token('position'),
            token('front_facing'),
            token('frag_depth'),
            token('local_invocation_id'),
            token('local_invocation_index'),
            token('global_invocation_id'),
            token('workgroup_id'),
            token('num_workgroups'),
            token('sample_index'),
            token('sample_mask')
        ),
        access_mode: $ => choice(
            token('read'),
            token('write'),
            token('read_write')
        ),
        address_space: $ => choice(
            token('function'),
            token('private'),
            token('workgroup'),
            token('uniform'),
            token('storage')
        ),
        texel_format: $ => choice(
            token('rgba8unorm'),
            token('rgba8snorm'),
            token('rgba8uint'),
            token('rgba8sint'),
            token('rgba16uint'),
            token('rgba16sint'),
            token('rgba16float'),
            token('r32uint'),
            token('r32sint'),
            token('r32float'),
            token('rg32uint'),
            token('rg32sint'),
            token('rg32float'),
            token('rgba32uint'),
            token('rgba32sint'),
            token('rgba32float')
        ),
        extension_name: $ => token('f16'),
        swizzle_name: $ => choice(
            token('/[rgba]/'),
            token('/[rgba][rgba]/'),
            token('/[rgba][rgba][rgba]/'),
            token('/[rgba][rgba][rgba][rgba]/'),
            token('/[xyzw]/'),
            token('/[xyzw][xyzw]/'),
            token('/[xyzw][xyzw][xyzw]/'),
            token('/[xyzw][xyzw][xyzw][xyzw]/')
        ),
        _reserved: $ => choice(
            token('CompileShader'),
            token('ComputeShader'),
            token('DomainShader'),
            token('GeometryShader'),
            token('Hullshader'),
            token('NULL'),
            token('Self'),
            token('abstract'),
            token('active'),
            token('alignas'),
            token('alignof'),
            token('as'),
            token('asm'),
            token('asm_fragment'),
            token('async'),
            token('attribute'),
            token('auto'),
            token('await'),
            token('become'),
            token('binding_array'),
            token('cast'),
            token('catch'),
            token('class'),
            token('co_await'),
            token('co_return'),
            token('co_yield'),
            token('coherent'),
            token('column_major'),
            token('common'),
            token('compile'),
            token('compile_fragment'),
            token('concept'),
            token('const_cast'),
            token('consteval'),
            token('constexpr'),
            token('constinit'),
            token('crate'),
            token('debugger'),
            token('decltype'),
            token('delete'),
            token('demote'),
            token('demote_to_helper'),
            token('do'),
            token('dynamic_cast'),
            token('enum'),
            token('explicit'),
            token('export'),
            token('extends'),
            token('extern'),
            token('external'),
            token('fallthrough'),
            token('filter'),
            token('final'),
            token('finally'),
            token('friend'),
            token('from'),
            token('fxgroup'),
            token('get'),
            token('goto'),
            token('groupshared'),
            token('handle'),
            token('highp'),
            token('impl'),
            token('implements'),
            token('import'),
            token('inline'),
            token('inout'),
            token('instanceof'),
            token('interface'),
            token('layout'),
            token('line'),
            token('lineadj'),
            token('lowp'),
            token('macro'),
            token('macro_rules'),
            token('match'),
            token('mediump'),
            token('meta'),
            token('mod'),
            token('module'),
            token('move'),
            token('mut'),
            token('mutable'),
            token('namespace'),
            token('new'),
            token('nil'),
            token('noexcept'),
            token('noinline'),
            token('nointerpolation'),
            token('noperspective'),
            token('null'),
            token('nullptr'),
            token('of'),
            token('operator'),
            token('package'),
            token('packoffset'),
            token('partition'),
            token('pass'),
            token('patch'),
            token('pixelfragment'),
            token('point'),
            token('precise'),
            token('precision'),
            token('premerge'),
            token('priv'),
            token('protected'),
            token('pub'),
            token('public'),
            token('readonly'),
            token('ref'),
            token('regardless'),
            token('register'),
            token('reinterpret_cast'),
            token('requires'),
            token('resource'),
            token('restrict'),
            token('self'),
            token('set'),
            token('shared'),
            token('signed'),
            token('sizeof'),
            token('smooth'),
            token('snorm'),
            token('static'),
            token('static_assert'),
            token('static_cast'),
            token('std'),
            token('subroutine'),
            token('super'),
            token('target'),
            token('template'),
            token('this'),
            token('thread_local'),
            token('throw'),
            token('trait'),
            token('try'),
            token('typedef'),
            token('typeid'),
            token('typename'),
            token('typeof'),
            token('union'),
            token('unless'),
            token('unorm'),
            token('unsafe'),
            token('unsized'),
            token('use'),
            token('using'),
            token('varying'),
            token('virtual'),
            token('volatile'),
            token('wgsl'),
            token('where'),
            token('with'),
            token('writeonly'),
            token('yield')
        ),
        ident: $ => $.ident_pattern_token,
        _comment: $ => seq(token('//'), token(/.*/)),
        _blankspace: $ => token(/[\u0020\u0009\u000a\u000b\u000c\u000d\u0085\u200e\u200f\u2028\u2029]/uy)
    },
});